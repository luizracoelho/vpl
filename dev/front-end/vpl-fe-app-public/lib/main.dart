import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/shared/states/theme_state.dart';
import 'package:vpl/providers.dart';
import 'package:vpl/routes.dart';
import 'package:vpl/theme.dart';
import 'package:vpl/utils.dart';

void main() {
  runApp(
    MultiProvider(
      providers: providers,
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeState>(builder: (context, state, child) {
      return MaterialApp(
        builder: (context, child) {
          return Overlay(
            initialEntries: [
              OverlayEntry(
                builder: (context) {
                  createEvaluationsHubConnection(context);
                  return child!;
                },
              ),
            ],
          );
        },
        debugShowCheckedModeBanner: false,
        debugShowMaterialGrid: false,
        theme: getTheme(state),
        routes: routes,
        title: 'VPL',
        initialRoute: '/home',
      );
    });
  }
}
