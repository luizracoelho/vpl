import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/home/components/price_list_home_card.dart';
import 'package:vpl/features/home/components/vehicle_home_card.dart';
import 'package:vpl/features/referenceYears/enums/price_reference.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';
import 'package:vpl/features/shared/states/vehicle_flow_state.dart';

class HomeContent extends StatelessWidget {
  const HomeContent({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: double.infinity,
      child: SingleChildScrollView(
        child: Padding(
            padding: const EdgeInsets.symmetric(
              vertical: 8.0,
              horizontal: 16.0,
            ),
            child: Consumer<VehicleFlowState>(builder: (context, vehicleState, child) {
              return Consumer<PriceListFlowState>(builder: (context, priceListState, child) {
                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SizedBox(
                      height: 300,
                      width: double.infinity,
                      child: Stack(
                        alignment: Alignment.bottomCenter,
                        children: [
                          Image.network(
                              'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1600'),
                          const Padding(
                            padding: EdgeInsets.only(
                              bottom: 8.0,
                            ),
                            child: Text(
                              'Consulte todas as marcas, modelos, veículos e seu histórico de valor de mercado através do app VPL.',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ],
                      ),
                    ),
                    getOptions(context, vehicleState, priceListState),
                    getTables(context, vehicleState, priceListState),
                  ],
                );
              });
            })),
      ),
    );
  }

  Widget getOptions(BuildContext context, VehicleFlowState vehicleState, PriceListFlowState priceListState) {
    return Padding(
      padding: const EdgeInsets.only(top: 12.0),
      child: Column(
        children: [
          Text(
            'Selecione uma das opções a seguir:',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                VehicleHomeCard(
                  vehicleState: vehicleState,
                  priceListState: priceListState,
                  title: 'Marcas',
                  subtitle: 'Consulte todas as marcas cadastradas',
                  icon: Icons.flag_circle_outlined,
                  route: '/brands',
                ),
                VehicleHomeCard(
                  vehicleState: vehicleState,
                  priceListState: priceListState,
                  title: 'Modelos',
                  subtitle: 'Consulte todos os modelos cadastrados',
                  icon: Icons.sell_outlined,
                  route: '/models',
                ),
                VehicleHomeCard(
                  vehicleState: vehicleState,
                  priceListState: priceListState,
                  title: 'Veículos',
                  subtitle: 'Consulte todos os veículos cadastrados',
                  icon: Icons.directions_car_outlined,
                  route: '/vehicles',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget getTables(BuildContext context, VehicleFlowState vehicleState, PriceListFlowState priceListState) {
    return Padding(
      padding: const EdgeInsets.only(top: 12.0),
      child: Column(
        children: [
          Text(
            'Selecione uma das tabelas a seguir:',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                PriceListHomeCard(
                  vehicleState: vehicleState,
                  priceListState: priceListState,
                  priceReference: PriceReference.Fipe,
                  title: 'Fipe',
                  subtitle: 'Consulte as referências da tabela FIPE',
                  icon: Icons.table_chart_outlined,
                  route: '/references',
                ),
                PriceListHomeCard(
                  vehicleState: vehicleState,
                  priceListState: priceListState,
                  priceReference: PriceReference.Molicar,
                  title: 'Molicar',
                  subtitle: 'Consulte as referências da tabela Molicar',
                  icon: Icons.table_chart_outlined,
                  route: '/references',
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
