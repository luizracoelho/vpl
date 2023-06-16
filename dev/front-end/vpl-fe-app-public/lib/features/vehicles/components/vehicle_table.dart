import 'package:flutter/material.dart';
import 'package:vpl/features/evaluations/models/evaluation.dart';

class VehicleTable extends StatelessWidget {
  final List<Evaluation> evaluations;
  final Color color;
  final int? year;
  const VehicleTable(this.evaluations, this.year, this.color, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return DataTable(
      columns: [
        DataColumn(
          label: Text(
            'Ano',
            style: Theme.of(context).textTheme.titleLarge,
          ),
        ),
        DataColumn(
          label: Text(
            'Valor',
            style: Theme.of(context).textTheme.titleLarge,
          ),
        ),
      ],
      rows: evaluations.map((evaluation) {
        return DataRow(cells: [
          DataCell(Row(
            children: [
              year == evaluation.year
                  ? Padding(
                      padding: const EdgeInsets.only(right: 8.0),
                      child: Icon(
                        Icons.check_circle,
                        color: color,
                      ),
                    )
                  : Container(),
              Text(evaluation.year.toString()),
            ],
          )),
          DataCell(Text('R\$ ${evaluation.value}')),
        ]);
      }).toList(),
    );
  }
}
