import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shimmer/shimmer.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';
import 'package:vpl/features/shared/states/primary_flow_state.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';
import '../states/vehicle_list_state.dart';

class VehiclesListPage extends StatelessWidget {
  const VehiclesListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<PrimaryFlowState>(builder: (_, flowState, listChild) {
      return Scaffold(
        appBar: AppBar(
          title: SizedBox(
            child: Column(
              children: [
                Text(flowState.model == null ? '' : flowState.model!.brandName,
                    style: Theme.of(context).textTheme.bodySmall),
                Text(flowState.model == null ? 'Veículos' : flowState.model!.name),
              ],
            ),
          ),
        ),
        drawer: const VplDrawer(),
        body: Consumer<VehicleListState>(builder: (context, listState, child) {
          return SafeArea(
            child: FutureBuilder(
              future: flowState.model != null
                  ? listState.listVehiclesByModelId(flowState.model!.id)
                  : listState.listAllVehicles(),
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
                          child: Consumer<PrimaryFlowState>(builder: (_, flowState, flowChild) {
                            return ListView.builder(
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
                                        Navigator.of(context).pushNamed(
                                          '/vehicles/details',
                                          arguments: vehicle.id,
                                        );
                                      },
                                    ),
                                    const Divider(),
                                  ],
                                );
                              },
                            );
                          }),
                        );
                }

                return Container();
              },
            ),
          );
        }),
      );
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
