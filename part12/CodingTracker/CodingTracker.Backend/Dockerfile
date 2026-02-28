FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src/CodingTracker.Backend
RUN dotnet tool install --global dotnet-ef
ENV PATH="${PATH}:/root/.dotnet/tools"
COPY ["CodingTracker.Backend.csproj", "."]
RUN dotnet restore "CodingTracker.Backend.csproj"
COPY . .
RUN dotnet build "CodingTracker.Backend.csproj" -c $BUILD_CONFIGURATION -o /app/build
RUN dotnet ef database update

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "CodingTracker.Backend.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false
COPY --from=build /src/CodingTracker.Backend/Data/*.db .

FROM base AS final
WORKDIR /app
COPY --from=publish --chown=$APP_UID /app/publish .
ENTRYPOINT ["dotnet", "CodingTracker.Backend.dll"]
