import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';

import '../service/vehicle_service.dart';

class VehiclesListPage extends StatefulWidget {
  const VehiclesListPage({super.key});

  @override
  State<VehiclesListPage> createState() => _VehiclesListPageState();
}

class _VehiclesListPageState extends State<VehiclesListPage> {
  List<Vehicle>? vehicles;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();

    listVehicles();
  }

  Future<void> listVehicles() async {
    setState(() {
      isLoading = true;
    });

    vehicles = await VehicleService.instance.list();

    setState(() {
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Veículos'),
      ),
      drawer: const VplDrawer(),
      body: SafeArea(
        child: isLoading
            ? Padding(
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
              )
            : vehicles?.isEmpty ?? true
                ? const Center(
                    child: Text(
                      'Nenhum veículo encontrado',
                    ),
                  )
                : RefreshIndicator(
                    color: Theme.of(context).primaryColor,
                    onRefresh: () async => listVehicles(),
                    child: ListView.builder(
                      itemCount: vehicles?.length ?? 0,
                      itemBuilder: (_, index) {
                        final Vehicle vehicle = vehicles![index];
                        return Column(
                          children: [
                            ListTile(
                              leading: CircleAvatar(backgroundImage: NetworkImage(vehicle.brandLogo)),
                              title: Text(vehicle.name),
                              trailing: const Icon(Icons.chevron_right),
                              onTap: () {
                                Navigator.of(context).pushNamed(
                                  '/vehicles',
                                  arguments: vehicle.id,
                                );
                              },
                            ),
                            const Divider(),
                          ],
                        );
                      },
                    ),
                  ),
      ),
    );
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
