FROM mcr.microsoft.com/dotnet/sdk:5.0 as builder

WORKDIR /app
COPY . .

RUN dotnet publish -c Release

FROM ubuntu:18.04

WORKDIR /app
COPY --from=builder /app/bin/Release/net5.0/publish/ .
RUN apt update && apt install wget -y
RUN wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
RUN dpkg -i packages-microsoft-prod.deb
RUN apt update && apt install -y dotnet-runtime-5.0
RUN apt -y install wget unzip build-essential checkinstall cmake pkg-config yasm git gfortran libjpeg8-dev libpng-dev software-properties-common
RUN add-apt-repository "deb http://security.ubuntu.com/ubuntu xenial-security main"
RUN apt -y update && apt -y install libjasper1 libtiff-dev libavcodec-dev libavformat-dev libswscale-dev libdc1394-22-dev libxine2-dev libv4l-dev
RUN cd /usr/include/linux && ln -s -f ../libv4l1-videodev.h videodev.h
RUN apt -y install libgtk2.0-dev libtbb-dev libatlas-base-dev libvorbis-dev libxvidcore-dev libopencore-amrnb-dev libopencore-amrwb-dev libavresample-dev x264 v4l-utils libwebp-dev tesseract-ocr libtesseract-dev libleptonica-dev
RUN apt -y install libopenexr22
CMD ["dotnet", "ImageProcessor.dll"]