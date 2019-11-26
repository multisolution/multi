import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Title'),
      ),
      body: testMutation(),
    );
  }

  String login = """
  mutation {
  signIn(email:"multi@multisolution.art.br" , password:"multi")
}
""";

  Widget testMutation() {
    return Mutation(
      options: MutationOptions(
        document: login,
      ),
      builder: (
        RunMutation runMutation,
        QueryResult result,
      ) {
        return FloatingActionButton(
          onPressed: () => runMutation({
            'email': 'multi@multisolution.art.br',
            'password': 'cPoeiRdmFS',
          }),
          tooltip: 'Star',
          child: Text(result.data.toString()),
        );
      },
      onCompleted: (dynamic result) {
        print('onComplpeted');
        print(result.data);
      },
    );
  }
}
