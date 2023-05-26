import 'package:flutter/material.dart';
import 'package:vpl/features/referenceYears/enum/reference_year_enum.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';

class ReferenceYearsListPage extends StatelessWidget {
  const ReferenceYearsListPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    dynamic args = ModalRoute.of(context)!.settings.arguments;
    int type = args.first;

    TabelaConsulta tabelaConsulta;
    if (type == 0) {
      tabelaConsulta = TabelaConsulta.FIPE;
    } else if (type == 1) {
      tabelaConsulta = TabelaConsulta.Molicar;
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
            Text(
                'Aqui estarão os ano de referência para ${tabelaConsulta.toString()}'),
            Placeholder(),
          ],
        ),
      ),
    );
  }
}
