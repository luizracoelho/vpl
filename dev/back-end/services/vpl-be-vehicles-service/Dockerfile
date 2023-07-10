# BASE - Criação da estrutura de pastas base
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
RUN mkdir /api
WORKDIR /api
EXPOSE 80

# PUBLISH - Publicação da aplicação
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS publish
WORKDIR /api
COPY . .
RUN dotnet restore "VehiclesService.csproj"
COPY . .
RUN dotnet publish "VehiclesService.csproj" -c Release -o dist

# FINAL - Cópia dos arquivos do publish para a estrutura de pastas base
FROM base AS final
WORKDIR /dist
COPY --from=publish /api/dist .
ENTRYPOINT ["dotnet", "VehiclesService.dll"]
