import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/brands/models/brand.dart';
import 'package:vpl/features/home/states/search_state.dart';
import 'package:vpl/features/models/models/model.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';
import 'package:vpl/features/shared/states/vehicle_flow_state.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';

import '../../shared/components/listTiles/brands/brand_list_tile.dart';
import '../../shared/components/listTiles/models/model_list_tile.dart';
import '../../shared/components/listTiles/vehicles/vehicle_list_tile.dart';

class HomeSearch extends StatelessWidget {
  const HomeSearch({Key? key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      initialIndex: 0,
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          bottom: PreferredSize(
            preferredSize: Size.fromHeight(kToolbarHeight),
            child: Consumer<SearchState>(
              builder: (_, searchState, __) => TabBar(
                tabs: <Widget>[
                  Tab(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.flag_circle_outlined),
                        SizedBox(width: 5),
                        Text(
                          searchState.result != null
                              ? searchState.result!.brands!.length.toString()
                              : 'Carregando...',
                        ),
                      ],
                    ),
                  ),
                  Tab(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.sell_outlined),
                        SizedBox(width: 5),
                        Text(
                          searchState.result != null
                              ? searchState.result!.models!.length.toString()
                              : 'Carregando...',
                        ),
                      ],
                    ),
                  ),
                  Tab(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.directions_car_outlined),
                        SizedBox(width: 5),
                        Text(
                          searchState.result != null
                              ? searchState.result!.vehicles!.length.toString()
                              : 'Carregando...',
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        body: Consumer<SearchState>(
          builder: (_, searchState, __) {
            if (searchState.result == null) {
              return const Text('Carregando...');
            } else {
              return searchState.result != null
                  ? Consumer<VehicleFlowState>(
                      builder: (_, vehicleFlowState, __) {
                        return Consumer<PriceListFlowState>(
                          builder: (_, priceFlowState, __) {
                            return TabBarView(
                              children: [
                                getBrands(
                                    searchState, context, vehicleFlowState),
                                getModels(
                                    searchState, context, vehicleFlowState),
                                getVehicles(
                                  searchState,
                                  context,
                                  vehicleFlowState,
                                  priceFlowState,
                                ),
                              ],
                            );
                          },
                        );
                      },
                    )
                  : Container();
            }
          },
        ),
      ),
    );
  }

  Widget getBrands(
    SearchState searchState,
    BuildContext context,
    VehicleFlowState vehicleFlowState,
  ) {
    return ListView.builder(
      itemCount: searchState.result!.brands!.length,
      itemBuilder: (_, index) {
        final Brand brand = searchState.result!.brands![index];

        return BrandListTile(
          brand: brand,
          vehicleState: vehicleFlowState,
        );
      },
    );
  }

  Widget getModels(
    SearchState searchState,
    BuildContext context,
    VehicleFlowState vehicleFlowState,
  ) {
    return ListView.builder(
      itemCount: searchState.result!.models!.length,
      itemBuilder: (_, index) {
        final Model model = searchState.result!.models![index];

        return ModelListTile(
          model: model,
          vehicleState: vehicleFlowState,
        );
      },
    );
  }

  Widget getVehicles(
    SearchState searchState,
    BuildContext context,
    VehicleFlowState vehicleFlowState,
    PriceListFlowState priceListFlowState,
  ) {
    return ListView.builder(
      itemCount: searchState.result!.vehicles!.length,
      itemBuilder: (_, index) {
        final Vehicle vehicle = searchState.result!.vehicles![index];

        return VehicleListTile(
          vehicle: vehicle,
          vehicleFlowState: vehicleFlowState,
          priceListFlowState: priceListFlowState,
        );
      },
    );
  }
}
