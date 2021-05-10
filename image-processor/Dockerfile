FROM mcr.microsoft.com/dotnet/sdk:5.0 as builder

WORKDIR /app
COPY ImageProcessor.csproj .
RUN dotnet restore "./ImageProcessor.csproj"
COPY . .

RUN dotnet publish -c Release

FROM ubuntu:18.04
RUN apt update && apt install wget -y
RUN wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
RUN dpkg -i packages-microsoft-prod.deb
RUN apt update && apt install -y dotnet-runtime-5.0
RUN wget -qO- https://media.githubusercontent.com/media/vaagnavanesyan/software-architect/main/image-processor/opencv-deps.tgz | tar --transform 's/^dbt2-0.37.50.3/dbt2/' -xvz -C /
WORKDIR /app
COPY --from=builder /app/bin/Release/net5.0/publish/ .