#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["MongoDB/EDT.WebApp.csproj", "MongoDB/"]
COPY ["MongoDB.Library/EDT.Library.csproj", "MongoDB.Library/"]
RUN dotnet restore "MongoDB/EDT.WebApp.csproj"
COPY . .
WORKDIR "/src/MongoDB"
RUN dotnet build "EDT.WebApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EDT.WebApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MongoDB.WebApp.dll"]
