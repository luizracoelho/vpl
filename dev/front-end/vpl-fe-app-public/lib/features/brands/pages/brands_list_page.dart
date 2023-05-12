import 'package:flutter/material.dart';

class BrandsListPage extends StatelessWidget {
  const BrandsListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('VPL Marcas'),
      ),
      body: const SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [Text('Aqui estarão as marcas'), Placeholder()],
        ),
      ),
    );
  }
}
