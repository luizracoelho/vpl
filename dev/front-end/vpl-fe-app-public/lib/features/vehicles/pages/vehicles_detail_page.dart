import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';
import 'package:vpl/features/shared/states/vehicle_flow_state.dart';
import 'package:vpl/features/vehicles/components/vehicle_table.dart';
import 'package:vpl/features/vehicles/enums/vehicle_type.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';
import 'package:vpl/features/vehicles/states/vehicle_detail_state.dart';
import '../../../data/data.dart';
import '../../shared/components/charts/line_chart.dart';

class VehicleDetailPage extends StatelessWidget {
  late Vehicle vehicle;

  VehicleDetailPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<VehicleFlowState>(
        builder: (context, vehicleFlowState, child) {
      return Consumer<PriceListFlowState>(
          builder: (context, priceListFlowState, child) {
        vehicle = priceListFlowState.vehicle ?? vehicleFlowState.vehicle!;

        return Consumer<VehicleDetailState>(
            builder: (context, detailState, child) {
          return DefaultTabController(
            initialIndex: 0,
            length: 3,
            child: Scaffold(
                appBar: AppBar(
                  title: Text(vehicle.name),
                  bottom: const TabBar(tabs: <Widget>[
                    Tab(icon: Icon(Icons.info_outline)),
                    Tab(icon: Icon(Icons.table_chart_outlined)),
                    Tab(icon: Icon(Icons.table_view_outlined)),
                  ]),
                ),
                body: TabBarView(
                  children: [
                    getInfoTab(detailState, priceListFlowState),
                    getChartTab(detailState, priceListFlowState, context),
                    getTableTab(detailState, priceListFlowState)
                  ],
                )),
          );
        });
      });
    });
  }

  Text getTableTab(
      VehicleDetailState detailState, PriceListFlowState priceListFlowState) {
    return const Text('Aqui estarão as tabelas',
        style: TextStyle(fontSize: 20));
  }

  SingleChildScrollView getChartTab(VehicleDetailState detailState,
      PriceListFlowState priceListFlowState, BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Container(
            margin: const EdgeInsets.all(15),
            padding: const EdgeInsets.all(15),
            decoration: BoxDecoration(
              border: Border.all(
                color: Colors.teal,
                style: BorderStyle.solid,
                width: 2,
              ),
              color: Theme.of(context).primaryColor,
              borderRadius: BorderRadius.circular(30.0),
            ),
            child: Column(
              children: [
                const Text(
                  'Valores por ano',
                  style: TextStyle(
                    fontSize: 30.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                MyLineChart(chartData),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String getTypeVehicle(VehicleType vehicleType) {
    switch (vehicleType.value) {
      case 1:
        return 'CARRO';
      case 2:
        return 'MOTO';
      case 3:
        return 'ÔNIBUS';
      case 4:
        return 'CAMINHÃO';
      case 5:
        return 'VAN';
      default:
    }
    return 'UNDEFINED';
  }

  FutureBuilder<void> getInfoTab(
      VehicleDetailState detailState, PriceListFlowState priceListFlowState) {
    return FutureBuilder(
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
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(30.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                children: [
                                  CircleAvatar(
                                    backgroundImage: NetworkImage(detailState
                                        .vehicleDetail!.vehicle.brandLogo),
                                    radius: 50,
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Text(
                                    detailState
                                        .vehicleDetail!.vehicle.brandName,
                                    style: const TextStyle(fontSize: 25),
                                  ),
                                  Text(
                                    detailState.vehicleDetail!.vehicle.model,
                                    style: const TextStyle(fontSize: 15),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                        const Divider(),
                      ],
                    ),
                  ),
                ),
                Row(
                  children: [
                    Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            children: [
                              SizedBox(
                                width: 180,
                                height: 100,
                                child: Card(
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        const Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            children: [
                                              Column(
                                                children: [
                                                  Text('Ano Produção'),
                                                ],
                                              )
                                            ]),
                                        Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            children: [
                                              Column(
                                                children: [
                                                  Text(
                                                    detailState.vehicleDetail!
                                                        .vehicle.productionYear
                                                        .toString(),
                                                    style: const TextStyle(
                                                        fontSize: 20,
                                                        fontWeight:
                                                            FontWeight.bold),
                                                  ),
                                                ],
                                              )
                                            ]),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              SizedBox(
                                width: 180,
                                height: 100,
                                child: Card(
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        const Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            children: [
                                              Column(
                                                children: [
                                                  Text('Ano Modelo'),
                                                ],
                                              )
                                            ]),
                                        Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            children: [
                                              Column(
                                                children: [
                                                  Text(
                                                    detailState.vehicleDetail!
                                                        .vehicle.modelYear
                                                        .toString(),
                                                    style: const TextStyle(
                                                        fontSize: 20,
                                                        fontWeight:
                                                            FontWeight.bold),
                                                  ),
                                                ],
                                              )
                                            ]),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ]),
                  ],
                ),
                Row(
                  children: [
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: SizedBox(
                          width: 336,
                          height: 100,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Column(
                                      children: [
                                        Text('Tipo'),
                                      ],
                                    )
                                  ]),
                              Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Column(
                                      children: [
                                        Text(
                                          getTypeVehicle(detailState
                                              .vehicleDetail!.vehicle.type),
                                          style: const TextStyle(
                                              fontSize: 20,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ],
                                    )
                                  ]),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          );
        }
        return Center(
          child: Text(snapshot.error.toString()),
        );
      },
    );
  }

  String getTypeVehicle(VehicleType vehicleType) {
    switch (vehicleType.value) {
      case 1:
        return 'CARRO';
      case 2:
        return 'MOTO';
      case 3:
        return 'ÔNIBUS';
      case 4:
        return 'CAMINHÃO';
      case 5:
        return 'VAN';
      default:
    }
    return 'UNDEFINED';
  }
}
