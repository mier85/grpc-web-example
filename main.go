package main

import (
	"github.com/mier85/grpc-web-example/contract"

	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/grpc-ecosystem/go-grpc-middleware"
	"github.com/grpc-ecosystem/go-grpc-middleware/logging/zap"
	"go.uber.org/zap"
	"golang.org/x/net/context"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserHandler struct {
}

func (u *UserHandler) CreateUser(ctx context.Context, request *contract.CreateUserRequest) (*contract.CreateUserResponse, error) {
	fmt.Printf("%#v\n", request)
	if request.Username == "error" {
		return &contract.CreateUserResponse{}, status.Error(codes.InvalidArgument, "an error was triggered intentionally")
	}
	return &contract.CreateUserResponse{Uuid: "i am not really unique"}, nil
}

func main() {
	// initialize logger
	logger, err := zap.NewProduction()
	if nil != err {
		log.Fatal(err)
	}

	// grpc server with logger
	server := grpc.NewServer(
		grpc.UnaryInterceptor(
			grpc_middleware.ChainUnaryServer(
				grpc_zap.UnaryServerInterceptor(logger),
			),
		),
	)

	// register our contract with the handler
	contract.RegisterUserServer(server, &UserHandler{})

	mux := http.NewServeMux()

	// that's where we get our client from
	mux.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js/dist"))))

	// and here is our html
	mux.Handle("/", http.FileServer(http.Dir("./web/")))

	h2s := &http2.Server{}
	hls := &http.Server{
		Addr:    ":8088",
		Handler: h2c.NewHandler(mux, h2s),
	}

	// start the web server
	go func() {
		if err := hls.ListenAndServe(); nil != err {
			logger.Fatal("failed listening to http", zap.Error(err))
		}
	}()

	// we do this to serve the classical grpc connection
	listener, err := net.Listen("tcp", ":50055")
	if nil != err {
		logger.Fatal("failed listening", zap.Error(err))
	}

	if err := server.Serve(listener); nil != err {
		logger.Fatal("failed serving", zap.Error(err))
	}
}
