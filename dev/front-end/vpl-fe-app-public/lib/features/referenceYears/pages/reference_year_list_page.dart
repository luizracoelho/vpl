import 'package:flutter/material.dart';

class ReferenceYearsListPage extends StatelessWidget {
  const ReferenceYearsListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ReferenceYears'),
      ),
      body: const SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [Text('Aqui estarão os ano de referência'), Placeholder()],
        ),
      ),
    );
  }
}
