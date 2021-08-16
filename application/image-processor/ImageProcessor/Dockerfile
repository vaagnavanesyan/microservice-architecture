#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM ubuntu:18.04 AS base
ENV ASPNETCORE_URLS=http://+:80
ENV DOTNET_RUNNING_IN_CONTAINER=true
ENV DOTNET_VERSION=5.0.5
RUN apt update && apt install wget -y
RUN wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
RUN dpkg -i packages-microsoft-prod.deb
RUN apt update && apt install -y dotnet-runtime-5.0
RUN wget -qO- https://media.githubusercontent.com/media/vaagnavanesyan/microservice-architecture/main/application/image-processor/ImageProcessor/opencv-deps.tgz | tar --transform 's/^dbt2-0.37.50.3/dbt2/' -xvz -C /
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["ImageProcessor/ImageProcessor.csproj", "ImageProcessor/"]
RUN dotnet restore "ImageProcessor/ImageProcessor.csproj"
COPY . .
WORKDIR "/src/ImageProcessor"
RUN dotnet build "ImageProcessor.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ImageProcessor.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ImageProcessor.dll"]
