import 'package:flutter/material.dart';

class VehicleDetailPage extends StatelessWidget {
  final String? name;
  final String? brandLogo;
  final String? model;
  final int? productionYear;
  final int? modelYear;
  final String? type;

  const VehicleDetailPage({
    this.name,
    this.brandLogo,
    this.model,
    this.productionYear,
    this.modelYear,
    this.type,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalhes do Veículo'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            if (brandLogo != null)
              CircleAvatar(
                backgroundImage: NetworkImage(brandLogo!),
                radius: 50,
              ),
            const SizedBox(height: 16.0),
            Text(
              name ?? 'Nome do Veículo Não encontrado"',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            Text(
              model ?? 'Modelo Não encontrado"',
              style: const TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 8.0),
            Text(
              'Ano de produção: ${productionYear ?? 'Não encontrado"'}',
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 8.0),
            Text(
              'Ano do modelo: ${modelYear ?? 'Não encontrado"'}',
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 8.0),
            Text(
              'Tipo: ${type ?? 'Não encontrado"'}',
              style: const TextStyle(fontSize: 16),
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(
    MaterialApp(
      home: VehicleDetailPage(
        name: 'Honda Civic',
        brandLogo:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.americanas.com.br%2Fproduto%2F1509246337%2Femblema-logo-honda-mala-universal-cromado-fundo-vermelho-&psig=AOvVaw0o1g287ehB2iIsiZzw0Yvo&ust=1685761329012000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKCRhrzMo_8CFQAAAAAdAAAAABA3',
        model: 'Sedan',
        productionYear: 2023,
        modelYear: 2023,
        type: 'Carro',
      ),
    ),
  );
}
