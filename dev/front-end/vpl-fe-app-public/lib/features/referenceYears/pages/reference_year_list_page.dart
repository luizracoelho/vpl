import 'package:flutter/material.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';

class ReferenceYearsListPage extends StatelessWidget {
  const ReferenceYearsListPage({super.key});

  @override
  Widget build(BuildContext context) {
    dynamic args = ModalRoute.of(context)!.settings.arguments;
    int type = args.first;

    return Scaffold(
      appBar: AppBar(
        title: const Text('ReferenceYears'),
      ),
      drawer: const VplDrawer(),
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
