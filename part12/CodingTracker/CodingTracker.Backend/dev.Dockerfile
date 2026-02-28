FROM mcr.microsoft.com/dotnet/sdk:10.0 AS dev
WORKDIR /source
ENV DOTNET_ENVIRONMENT=Development
ENV PATH="${PATH}:/root/.dotnet/tools"
RUN dotnet tool install --global dotnet-ef
COPY ["CodingTracker.Backend.csproj", "./"]
RUN dotnet restore "CodingTracker.Backend.csproj"
COPY . .
RUN dotnet build
RUN dotnet ef database update
EXPOSE 5000 7000
ENTRYPOINT ["dotnet", "watch"]