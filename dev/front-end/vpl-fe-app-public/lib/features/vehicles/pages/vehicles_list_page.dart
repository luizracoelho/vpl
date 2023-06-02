import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shimmer/shimmer.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';
import 'package:vpl/features/shared/states/vehicle_flow_state.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';
import '../states/vehicle_list_state.dart';

class VehiclesListPage extends StatelessWidget {
  const VehiclesListPage({super.key});

  String getSubtitleText(VehicleFlowState vehicleFlowState, PriceListFlowState priceListFlowState) {
    var subtitle = 'Todos os';

    if (vehicleFlowState.model != null) {
      subtitle = vehicleFlowState.model!.brandName;
    } else if (priceListFlowState.priceReference != null) {
      subtitle = priceListFlowState.priceReference!.name;
    }

    return subtitle;
  }

  String getTitleText(VehicleFlowState vehicleFlowState, PriceListFlowState priceListFlowState) {
    var title = 'Veículos';

    if (vehicleFlowState.model != null) {
      title = vehicleFlowState.model!.name;
    } else if (priceListFlowState.year != null) {
      title = priceListFlowState.year.toString();
    }

    return title;
  }

  Future<void> getRequest(
      VehicleFlowState vehicleFlowState, PriceListFlowState priceListFlowState, VehicleListState listState) {
    var request = listState.listAllVehicles();

    if (vehicleFlowState.model != null) {
      request = listState.listVehiclesByModelId(vehicleFlowState.model!.id);
    } else if (priceListFlowState.year != null) {
      request =
          listState.listVehiclesByPriceReferenceYear(priceListFlowState.priceReference!, priceListFlowState.year!);
    }

    return request;
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<VehicleFlowState>(builder: (_, vehicleFlowState, listChild) {
      return Consumer<PriceListFlowState>(builder: (_, priceListFlowState, listChild) {
        return Scaffold(
          appBar: AppBar(
            title: SizedBox(
              child: Column(
                children: [
                  Text(getSubtitleText(vehicleFlowState, priceListFlowState),
                      style: Theme.of(context).textTheme.bodySmall),
                  Text(getTitleText(vehicleFlowState, priceListFlowState)),
                ],
              ),
            ),
          ),
          drawer: priceListFlowState.year == null ? const VplDrawer() : null,
          body: Consumer<VehicleListState>(builder: (context, listState, child) {
            return SafeArea(
              child: FutureBuilder(
                future: getRequest(vehicleFlowState, priceListFlowState, listState),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.none ||
                      snapshot.connectionState == ConnectionState.waiting) {
                    return Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: SingleChildScrollView(
                        child: SizedBox(
                          width: double.infinity,
                          child: Column(
                            children: [
                              getLoadingItem(),
                              getLoadingItem(),
                              getLoadingItem(),
                              getLoadingItem(),
                              getLoadingItem(),
                              getLoadingItem(),
                              getLoadingItem(),
                              getLoadingItem(),
                              getLoadingItem(),
                              getLoadingItem(),
                              getLoadingItem(),
                              getLoadingItem(),
                              getLoadingItem(),
                            ],
                          ),
                        ),
                      ),
                    );
                  } else if (!snapshot.hasError) {
                    return listState.vehicleList?.isEmpty ?? true
                        ? const Center(
                            child: Text(
                              'Nenhum veículo encontrado',
                            ),
                          )
                        : RefreshIndicator(
                            color: Theme.of(context).primaryColor,
                            onRefresh: () async => listState.refresh(),
                            child: ListView.builder(
                              itemCount: listState.vehicleList?.length ?? 0,
                              itemBuilder: (_, index) {
                                final Vehicle vehicle = listState.vehicleList![index];

                                return Column(
                                  children: [
                                    ListTile(
                                      leading: CircleAvatar(backgroundImage: NetworkImage(vehicle.brandLogo)),
                                      title: Text(vehicle.name),
                                      trailing: const Icon(Icons.chevron_right),
                                      onTap: () {
                                        if (priceListFlowState.year != null) {
                                          priceListFlowState.selectVehicle(vehicle);
                                        } else {
                                          vehicleFlowState.selectVehicle(vehicle);
                                        }

                                        Navigator.of(context).pushNamed('/vehicles/details');
                                      },
                                    ),
                                    const Divider(),
                                  ],
                                );
                              },
                            ),
                          );
                  }

                  return Container();
                },
              ),
            );
          }),
        );
      });
    });
  }

  Widget getLoadingItem() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Shimmer.fromColors(
                    baseColor: Colors.grey.shade400,
                    highlightColor: Colors.grey.shade300,
                    child: Container(
                      height: 40,
                      width: 40,
                      decoration: BoxDecoration(
                        color: Colors.grey.shade400,
                        borderRadius: BorderRadius.circular(
                          20,
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 8.0),
                    child: Shimmer.fromColors(
                      baseColor: Colors.grey.shade400,
                      highlightColor: Colors.grey.shade300,
                      child: Container(
                        height: 15,
                        width: 100,
                        color: Colors.grey.shade400,
                      ),
                    ),
                  ),
                ],
              ),
              Shimmer.fromColors(
                baseColor: Colors.grey.shade400,
                highlightColor: Colors.grey.shade300,
                child: Icon(
                  Icons.chevron_right,
                  color: Colors.grey.shade400,
                ),
              ),
            ],
          ),
          const Divider(),
        ],
      ),
    );
  }
}
