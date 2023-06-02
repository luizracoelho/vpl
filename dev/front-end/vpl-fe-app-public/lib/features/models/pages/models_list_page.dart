import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shimmer/shimmer.dart';
import 'package:vpl/features/brands/models/brand.dart';
import 'package:vpl/features/models/states/models_list_state.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';
import 'package:vpl/features/shared/states/vehicle_flow_state.dart';
import '../models/model.dart';
import '../service/model_service.dart';

class ModelsListPage extends StatelessWidget {
  final Brand? brand;

  const ModelsListPage({Key? key, this.brand}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Consumer<VehicleFlowState>(builder: (_, flowState, listChild) {
      return Scaffold(
        appBar: AppBar(
          title: Text(flowState.brand == null ? 'VPL Modelos' : flowState.brand!.name),
        ),
        drawer: const VplDrawer(),
        body: SafeArea(
          child: Consumer<ModelsListState>(builder: (context, listState, child) {
            return FutureBuilder(
              future:
                  flowState.brand == null ? listState.listModels() : listState.listModelsByBrand(flowState.brand!.id),
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
                  return listState.models?.isEmpty ?? true
                      ? const Center(
                          child: Text(
                            'Nenhum modelo encontrado',
                          ),
                        )
                      : RefreshIndicator(
                          color: Theme.of(context).primaryColor,
                          onRefresh: () async => listState.refresh(),
                          child: Consumer<VehicleFlowState>(builder: (_, flowState, flowChild) {
                            return ListView.builder(
                              itemCount: listState.models?.length ?? 0,
                              itemBuilder: (_, index) {
                                final Model model = listState.models![index];

                                return Column(
                                  children: [
                                    ListTile(
                                      leading: CircleAvatar(backgroundImage: NetworkImage(model.brandLogo)),
                                      title: Text(model.name),
                                      trailing: const Icon(Icons.chevron_right),
                                      onTap: () {
                                        flowState.selectModel(model);
                                        Navigator.of(context).pushNamed('/vehicles');
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
            );
          }),
        ),
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
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Shimmer.fromColors(
                    baseColor: Colors.grey.shade400,
                    highlightColor: Colors.grey.shade300,
                    child: Container(
                      height: 12,
                      width: 100,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(6),
                      ),
                    ),
                  ),
                ],
              ),
              Shimmer.fromColors(
                baseColor: Colors.grey.shade400,
                highlightColor: Colors.grey.shade300,
                child: Container(
                  height: 24,
                  width: 24,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
