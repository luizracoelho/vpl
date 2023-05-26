import 'package:flutter/material.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';

import '../enums/price_reference.dart';

class ReferenceYearsListPage extends StatelessWidget {
  const ReferenceYearsListPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    dynamic args = ModalRoute.of(context)!.settings.arguments;
    int type = args;

    PriceReference tabelaConsulta;
    if (type == 0) {
      tabelaConsulta = PriceReference.Fipe;
    } else if (type == 1) {
      tabelaConsulta = PriceReference.Molicar;
    } else {
      return Container();
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('ReferenceYears'),
      ),
      drawer: const VplDrawer(),
      body: SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text('Aqui estarão os ano de referência para ${tabelaConsulta.toString()}'),
            Placeholder(),
          ],
        ),
      ),
    );
  }
}
