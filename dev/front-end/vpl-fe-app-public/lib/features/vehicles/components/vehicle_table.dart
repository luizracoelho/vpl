import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';
import 'package:vpl/features/shared/states/vehicle_flow_state.dart';

class VehicleTable extends StatelessWidget {
  final List<Map<String, dynamic>> vehicles;
  // final String title;
  // final String? subtitle;
  const VehicleTable({Key? key, required this.vehicles}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Consumer<VehicleFlowState>(builder: (context, vehicleState, child) {
      return Consumer<PriceListFlowState>(
          builder: (context, priceListState, child) {
        return DataTable(
          columns: [
            DataColumn(label: Text('Ano')),
            DataColumn(label: Text('Valor')),
          ],
          rows: vehicles.map((vehicle) {
            return DataRow(cells: [
              DataCell(Text(vehicle['ano'].toString())),
              DataCell(Text('R\$ ${vehicle['valor']}')),
            ]);
          }).toList(),
        );
      });
    });
  }
}
