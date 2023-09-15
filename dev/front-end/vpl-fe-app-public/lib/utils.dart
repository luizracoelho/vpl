import 'package:flutter/material.dart';
import 'package:signalr_netcore/hub_connection.dart';
import 'package:signalr_netcore/hub_connection_builder.dart';
import 'package:vpl/environment.dart';
import 'package:flutter_toastr/flutter_toastr.dart';

bool isIphoneLandscape(BoxConstraints constraints) => constraints.maxWidth >= 576;

bool isIpad(BoxConstraints constraints) => constraints.maxWidth >= 768;

HubConnection? evaluationHubConnection;

Future<void> createEvaluationsHubConnection(BuildContext context) async {
  if (evaluationHubConnection == null) {
    try {
      // Criar conexão
      evaluationHubConnection = HubConnectionBuilder()
          .withUrl('${Environment.notificationsUrl}/hubs/evaluations')
          .withAutomaticReconnect()
          .build();

      if (evaluationHubConnection?.state == HubConnectionState.Disconnected) {
        await evaluationHubConnection!.start();
      }

      evaluationHubConnection!.on('EvaluationCreated', (arguments) {
        if (arguments != null) {
          var message = arguments[0] as String;

          FlutterToastr.show(
            message,
            context,
            duration: 5,
            position: FlutterToastr.bottom,
          );
        }
      });

      evaluationHubConnection!.on('EvaluationUpdated', (arguments) {
        if (arguments != null) {
          var message = arguments[0] as String;

          FlutterToastr.show(
            message,
            context,
            duration: 5,
            position: FlutterToastr.bottom,
          );
        }
      });
    } catch (e) {
      evaluationHubConnection = null;
      await createEvaluationsHubConnection(context);
    }
  } else {
    if (evaluationHubConnection?.state == HubConnectionState.Disconnected) {
      await evaluationHubConnection?.start();
    }
  }
}
