import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  DateTimeInput,
  TextInput,
} from "react-admin";

export const RechargeIntegrationCreate = (
  props: CreateProps
): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <DateTimeInput label="deliveryDate" source="deliveryDate" />
        <TextInput label="rechargeCustomerId" source="rechargeCustomerId" />
        <TextInput
          label="rechargeSubscriptionId"
          source="rechargeSubscriptionId"
        />
      </SimpleForm>
    </Create>
  );
};
