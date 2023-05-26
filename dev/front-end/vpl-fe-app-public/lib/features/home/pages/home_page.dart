import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';
import 'package:vpl/features/shared/states/theme_state.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('VPL Home'),
        actions: [
          Consumer<ThemeState>(builder: (context, state, child) {
            return IconButton(
              onPressed: () => state.toggleTheme(),
              icon: Icon(state.icon),
            );
          })
        ],
      ),
      drawer: const VplDrawer(),
      body: SafeArea(
        child: SizedBox(
          width: double.infinity,
          height: double.infinity,
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.symmetric(
                vertical: 8.0,
                horizontal: 16.0,
              ),
              child: Column(
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
                  getSearch(context),
                  getOptions(context),
                  getTables(context),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget getSearch(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 12.0),
      child: Column(
        children: [
          Text(
            'Pesquise uma marca, modelo ou veículo:',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const TextField(
            decoration: InputDecoration(
              hintText: 'Digite sua pesquisa...',
              suffixIcon: Icon(Icons.search),
            ),
          ),
        ],
      ),
    );
  }

  Widget getOptions(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 12.0),
      child: Column(
        children: [
          Text(
            'Selecione uma das opções a seguir:',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                HomeCard(
                  title: 'Marcas',
                  subtitle: 'Consulte todas as marcas cadastradas',
                  icon: Icons.flag_circle_outlined,
                  route: '/brands',
                ),
                HomeCard(
                  title: 'Modelos',
                  subtitle: 'Consulte todos os modelos cadastrados',
                  icon: Icons.sell_outlined,
                  route: '/models',
                ),
                HomeCard(
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

  Widget getTables(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 12.0),
      child: Column(
        children: [
          Text(
            'Selecione uma das tabelas a seguir:',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                HomeCard(
                  title: 'Fipe',
                  subtitle: 'Consulte as referências da tabela FIPE',
                  icon: Icons.table_chart_outlined,
                  route: '/references',
                  routeParams: 1,
                ),
                HomeCard(
                  title: 'Molicar',
                  subtitle: 'Consulte as referências da tabela Molicar',
                  icon: Icons.table_chart_outlined,
                  route: '/references',
                  routeParams: 2,
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}

class HomeCard extends StatelessWidget {
  final String title;
  final String? subtitle;
  final IconData icon;
  final String route;
  final dynamic routeParams;

  const HomeCard({
    super.key,
    required this.title,
    required this.icon,
    required this.route,
    this.routeParams,
    this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.of(context).pushReplacementNamed(
        route,
        arguments: routeParams,
      ),
      child: Padding(
        padding: const EdgeInsets.only(right: 8.0),
        child: Card(
          child: SizedBox(
            width: 250,
            height: 100,
            child: Center(
              child: ListTile(
                leading: CircleAvatar(
                  child: Icon(
                    icon,
                  ),
                ),
                title: Text(
                  title,
                ),
                subtitle: Text(subtitle ?? ''),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
