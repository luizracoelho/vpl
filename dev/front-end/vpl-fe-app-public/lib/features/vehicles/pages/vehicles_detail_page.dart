import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';
import 'package:vpl/features/shared/states/vehicle_flow_state.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';
import 'package:vpl/features/vehicles/states/vehicle_detail_state.dart';

class VehicleDetailPage extends StatelessWidget {
  late Vehicle vehicle;

  VehicleDetailPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<VehicleFlowState>(builder: (context, vehicleFlowState, child) {
      return Consumer<PriceListFlowState>(builder: (context, priceListFlowState, child) {
        vehicle = priceListFlowState.vehicle ?? vehicleFlowState.vehicle!;

        return Consumer<VehicleDetailState>(builder: (context, detailState, child) {
          return Scaffold(
              appBar: AppBar(
                title: Text(vehicle.name),
              ),
              body: FutureBuilder(
                future: detailState.getDetail(
                  vehicle.id,
                  priceListFlowState.priceReference,
                ),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.none ||
                      snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child: Text('Carregando...'),
                    );
                  } else if (!snapshot.hasError) {
                    return Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          CircleAvatar(
                            backgroundImage: NetworkImage(detailState.vehicleDetail!.vehicle.brandLogo),
                            radius: 50,
                          ),
                          Text(
                            detailState.vehicleDetail!.vehicle.brandName,
                            style: const TextStyle(fontSize: 18),
                          ),
                          Text(
                            detailState.vehicleDetail!.vehicle.model,
                            style: const TextStyle(fontSize: 18),
                          ),
                          Text(
                            'Ano de produção: ${detailState.vehicleDetail!.vehicle.productionYear}',
                            style: const TextStyle(fontSize: 16),
                          ),
                          Text(
                            'Ano do modelo: ${detailState.vehicleDetail!.vehicle.modelYear}',
                            style: const TextStyle(fontSize: 16),
                          ),
                          Text(
                            'Tipo: ${detailState.vehicleDetail!.vehicle.type.name}',
                            style: const TextStyle(fontSize: 16),
                          ),
                        ],
                      ),
                    );
                  }

                  return Center(
                    child: Text(snapshot.error.toString()),
                  );
                },
              ));
        });
      });
    });
  }
}
