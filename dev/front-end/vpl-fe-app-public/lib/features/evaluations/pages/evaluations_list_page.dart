import 'package:flutter/material.dart';

class EvaluationsListPage extends StatelessWidget {
  const EvaluationsListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Evaluations'),
      ),
      body: const SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [Text('Aqui estarão as avaliações'), Placeholder()],
        ),
      ),
    );
  }
}
