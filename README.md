# grpc-web + golang

https://github.com/grpc/grpc-web

## let's create our demo

### prerequisites 
 
 - protoc ( this is doing the proto parsing magic and comes with bunch of default compilers ootb : https://github.com/protocolbuffers/protobuf/releases)
 - protoc-gen-go ( plugin to generate go code from proto : https://github.com/golang/protobuf )
 - protoc-gen-grpc-web ( plugin to create javascript grpc stub : https://github.com/grpc/grpc-web/releases )
 - npm ( get out javascript dependencies )
 - webpack / webpack-cli ( bundle dependencies of gprc-web + own client into a single file )
 - envoy ( proxy grpc-web traffic to the grpc server )


### steps 

- create a new project


        go mod init github.com/mier85/grpc-web-example

- create a protobuf contract


        mkdir contract
        touch contract/contract.proto


- now let's create the corresponding sources:


        # use protoc, generate go files including the grpc stub and make the path relative to where it should be
        protoc --go_out=plugins=grpc,paths=source_relative:. contract/contract.proto        





 - now let's build the service. first we need to get some dependencies 


        # in this step we download half of the internet
        go get -u google.golang.org/grpc
        
        # we don't need this, but it'll give us some nice extras
        go get -u github.com/grpc-ecosystem/go-grpc-middleware
        
        # get some logs going for us
        go get -u go.uber.org/zap
        
        
  - now let's create the web stuff
  
  
        # create the folders that we will need
        mkdir -p js/src/contract
  
        # similar to what we did with the go source, let's create the js sources now 
        protoc -I=./contract contract/contract.proto --js_out=import_style=commonjs:js/src/contract --grpc-web_out=import_style=commonjs,mode=grpcweb:js/src/contract

        cd js
        
        # now let's get to the hacky part, use webpack to create js that we can load inside the server
        npm init -y
        npm install --save-dev npx google-protobuf grpc-web webpack webpack-cli
        
        # create our client
        npx webpack --mode=development --output-library="grpcwebexample"  

        
- let's get it running        
        
        
        # last but not least, we need to proxy the web-request to the web endpoint 
    	docker build -f Dockerfile.envoy -t grpcwebexample/envoy .
        docker run --net=host grpcwebexample/envoy

        
        
        
