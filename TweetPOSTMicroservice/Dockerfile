#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["TweetPOSTMicroservice/TweetPostMicroservice.csproj", "TweetPOSTMicroservice/"]
COPY ["TweetApp-Common/TweetApp-Common.csproj", "TweetApp-Common/"]
RUN dotnet restore "TweetPOSTMicroservice/TweetPostMicroservice.csproj"
COPY . .
WORKDIR "/src/TweetPOSTMicroservice"
RUN dotnet build "TweetPostMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TweetPostMicroservice.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TweetPostMicroservice.dll"]