import 'package:flutter/material.dart';

class ModelsListPage extends StatelessWidget {
  const ModelsListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Models'),
      ),
      body: const SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [Text('Aqui estarão os modelos'), Placeholder()],
        ),
      ),
    );
  }
}
