import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shimmer/shimmer.dart';
import 'package:vpl/features/brands/models/brand.dart';
import 'package:vpl/features/brands/states/brands_list_state.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';
import 'package:vpl/features/shared/states/vehicle_flow_state.dart';

class BrandsListPage extends StatelessWidget {
  const BrandsListPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Consumer<BrandsListState>(builder: (_, listState, listChild) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('VPL Marcas'),
        ),
        drawer: const VplDrawer(),
        body: SafeArea(
          child: FutureBuilder(
            future: listState.listBrands(),
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
                return listState.brands?.isEmpty ?? true
                    ? const Center(
                        child: Text(
                          'Nenhuma marca encontrada',
                        ),
                      )
                    : RefreshIndicator(
                        color: Theme.of(context).primaryColor,
                        onRefresh: () async => listState.refresh(),
                        child: Consumer<VehicleFlowState>(builder: (_, flowState, flowChild) {
                          return ListView.builder(
                            itemCount: listState.brands?.length ?? 0,
                            itemBuilder: (_, index) {
                              final Brand brand = listState.brands![index];

                              return Column(
                                children: [
                                  ListTile(
                                    leading: CircleAvatar(backgroundImage: NetworkImage(brand.logo)),
                                    title: Text(brand.name),
                                    trailing: const Icon(Icons.chevron_right),
                                    onTap: () {
                                      flowState.selectBrand(brand);
                                      Navigator.of(context).pushNamed('/models');
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
                        height: 20,
                        width: 100,
                        decoration: BoxDecoration(
                          color: Colors.grey.shade400,
                          borderRadius: BorderRadius.circular(
                            10,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const Icon(Icons.chevron_right),
            ],
          ),
          const Divider(),
        ],
      ),
    );
  }
}
