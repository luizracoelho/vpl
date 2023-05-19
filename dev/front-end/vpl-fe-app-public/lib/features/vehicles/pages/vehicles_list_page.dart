import 'package:flutter/material.dart';

class VehiclesListPage extends StatelessWidget {
  const VehiclesListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vehicles'),
      ),
      body: const SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [Text('Aqui estarão os veículos'), Placeholder()],
        ),
      ),
    );
  }
}
