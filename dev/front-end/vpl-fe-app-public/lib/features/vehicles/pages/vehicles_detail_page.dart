import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/evaluations/models/evaluation.dart';
import 'package:vpl/features/referenceYears/enums/price_reference.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';
import 'package:vpl/features/shared/states/vehicle_flow_state.dart';
import 'package:vpl/features/vehicles/enums/vehicle_type.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';
import 'package:vpl/features/vehicles/states/vehicle_detail_state.dart';

import '../../../utils.dart';
import '../../shared/components/charts/line_chart.dart';
import '../components/vehicle_table.dart';

class VehicleDetailPage extends StatelessWidget {
  late Vehicle vehicle;

  VehicleDetailPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<VehicleFlowState>(builder: (context, vehicleFlowState, child) {
      return Consumer<PriceListFlowState>(builder: (context, priceListFlowState, child) {
        vehicle = priceListFlowState.vehicle ?? vehicleFlowState.vehicle!;

        return Consumer<VehicleDetailState>(builder: (context, detailState, child) {
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
              body: SafeArea(
                child: FutureBuilder(
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
                      return LayoutBuilder(builder: (context, constraints) {
                        return TabBarView(
                          children: [
                            getInfoTab(context, detailState, priceListFlowState),
                            getChartTab(context, detailState, priceListFlowState, constraints),
                            getTableTab(context, detailState, priceListFlowState)
                          ],
                        );
                      });
                    }
                    return Center(
                      child: Text(snapshot.error.toString()),
                    );
                  },
                ),
              ),
            ),
          );
        });
      });
    });
  }

  Widget getTableTab(BuildContext context, VehicleDetailState detailState, PriceListFlowState priceListFlowState) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.only(top: 16.0),
        child: Column(
          children: [
            (priceListFlowState.vehicle == null || priceListFlowState.priceReference == PriceReference.Fipe) &&
                    detailState.vehicleDetail!.evaluationsFipe != null
                ? Column(
                    children: [
                      Text(
                        'Valores por ano FIPE',
                        style: Theme.of(context).textTheme.headlineMedium,
                      ),
                      (detailState.vehicleDetail?.evaluationsFipe?.length ?? 0) > 0
                          ? VehicleTable(
                              detailState.vehicleDetail!.evaluationsFipe!,
                              priceListFlowState.year,
                              Colors.teal,
                            )
                          : const Text('Valores indisponíveis'),
                    ],
                  )
                : Container(),
            (priceListFlowState.vehicle == null || priceListFlowState.priceReference == PriceReference.Molicar) &&
                    detailState.vehicleDetail!.evaluationsMolicar != null
                ? Column(
                    children: [
                      Text(
                        'Valores por ano MOLICAR',
                        style: Theme.of(context).textTheme.headlineMedium,
                      ),
                      (detailState.vehicleDetail?.evaluationsMolicar?.length ?? 0) > 0
                          ? VehicleTable(
                              detailState.vehicleDetail!.evaluationsMolicar!,
                              priceListFlowState.year,
                              Colors.lime,
                            )
                          : const Text('Valores indisponíveis'),
                    ],
                  )
                : Container(),
          ],
        ),
      ),
    );
  }

  Widget getChartTab(BuildContext context, VehicleDetailState detailState, PriceListFlowState priceListFlowState,
      BoxConstraints constraints) {
    return SizedBox(
      width: constraints.maxWidth,
      height: constraints.maxHeight,
      child: getChartContent(constraints, detailState, priceListFlowState),
    );
  }

  Widget getChartContent(
      BoxConstraints constraints, VehicleDetailState detailState, PriceListFlowState priceListFlowState) {
    if (isIpad(constraints)) {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            child: Row(
              children: [
                TableChart(
                  title: 'Valores por ano FIPE',
                  color: Colors.teal,
                  evaluations: detailState.vehicleDetail?.evaluationsFipe,
                  priceListFlowState: priceListFlowState,
                  constraints: constraints,
                ),
                TableChart(
                  title: 'Valores por ano Molicar',
                  color: Colors.lime,
                  evaluations: detailState.vehicleDetail?.evaluationsMolicar,
                  priceListFlowState: priceListFlowState,
                  constraints: constraints,
                ),
              ],
            ),
          ),
        ],
      );
    } else if (isIphoneLandscape(constraints)) {
      return SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              child: Row(
                children: [
                  TableChart(
                    title: 'Valores por ano FIPE',
                    color: Colors.teal,
                    evaluations: detailState.vehicleDetail?.evaluationsFipe,
                    priceListFlowState: priceListFlowState,
                    constraints: constraints,
                  ),
                  TableChart(
                    title: 'Valores por ano Molicar',
                    color: Colors.lime,
                    evaluations: detailState.vehicleDetail?.evaluationsMolicar,
                    priceListFlowState: priceListFlowState,
                    constraints: constraints,
                  ),
                ],
              ),
            ),
          ],
        ),
      );
    } else {
      return SingleChildScrollView(
        child: Column(
          children: [
            TableChart(
              title: 'Valores por ano FIPE',
              color: Colors.teal,
              evaluations: detailState.vehicleDetail?.evaluationsFipe,
              priceListFlowState: priceListFlowState,
              constraints: constraints,
            ),
            TableChart(
              title: 'Valores por ano Molicar',
              color: Colors.lime,
              evaluations: detailState.vehicleDetail?.evaluationsMolicar,
              priceListFlowState: priceListFlowState,
              constraints: constraints,
            ),
          ],
        ),
      );
    }
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

  Widget getInfoTab(BuildContext context, VehicleDetailState detailState, PriceListFlowState priceListFlowState) {
    return SingleChildScrollView(
      child: Padding(
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
                                backgroundImage: NetworkImage(detailState.vehicleDetail!.vehicle.brandLogo),
                                radius: 50,
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              Text(
                                detailState.vehicleDetail!.vehicle.brandName,
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
                    priceListFlowState.priceReference != null
                        ? Column(
                            children: [
                              const Divider(),
                              Text(
                                priceListFlowState.priceReference!.name,
                                style: Theme.of(context).textTheme.labelLarge,
                              )
                            ],
                          )
                        : Container(),
                  ],
                ),
              ),
            ),
            Row(
              children: [
                Flexible(
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                            Column(
                              children: [
                                Text('Ano Produção'),
                              ],
                            )
                          ]),
                          Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                            Column(
                              children: [
                                Text(
                                  detailState.vehicleDetail!.vehicle.productionYear.toString(),
                                  style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                                ),
                              ],
                            )
                          ]),
                        ],
                      ),
                    ),
                  ),
                ),
                Flexible(
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                            Column(
                              children: [
                                Text('Ano Modelo'),
                              ],
                            )
                          ]),
                          Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                            Column(
                              children: [
                                Text(
                                  detailState.vehicleDetail!.vehicle.modelYear.toString(),
                                  style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
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
            Card(
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(
                  horizontal: 8.0,
                  vertical: 16,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text('Tipo'),
                    Text(
                      getTypeVehicle(detailState.vehicleDetail!.vehicle.type),
                      style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class TableChart extends StatelessWidget {
  final List<Evaluation>? evaluations;
  final PriceListFlowState priceListFlowState;
  final String title;
  final Color color;
  final BoxConstraints constraints;

  const TableChart(
      {required this.title,
      required this.color,
      required this.evaluations,
      required this.priceListFlowState,
      required this.constraints,
      super.key});

  @override
  Widget build(BuildContext context) {
    return Visibility(
      visible: priceListFlowState.vehicle == null || priceListFlowState.priceReference == PriceReference.Fipe,
      child: Container(
        width: isIpad(constraints) || isIphoneLandscape(constraints)
            ? (constraints.maxWidth - 64) / 2
            : constraints.maxWidth,
        // height: isIpad(constraints) ? (constraints.maxHeight - 64) / 2 : null,
        margin: const EdgeInsets.all(16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          border: Border.all(
            color: color,
            style: BorderStyle.solid,
            width: 2,
          ),
          color: Theme.of(context).cardColor,
          borderRadius: BorderRadius.circular(30.0),
        ),
        child: Column(
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            Padding(
              padding: const EdgeInsets.only(top: 16),
              child: (evaluations?.length ?? 0) > 0
                  ? MyLineChart(evaluations!, color, constraints)
                  : const Text('Valores indisponíveis'),
            )
          ],
        ),
      ),
    );
  }
}
