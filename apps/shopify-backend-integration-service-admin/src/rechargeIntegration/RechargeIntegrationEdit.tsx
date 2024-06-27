import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  DateTimeInput,
  TextInput,
} from "react-admin";

export const RechargeIntegrationEdit = (
  props: EditProps
): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <DateTimeInput label="deliveryDate" source="deliveryDate" />
        <TextInput label="rechargeCustomerId" source="rechargeCustomerId" />
        <TextInput
          label="rechargeSubscriptionId"
          source="rechargeSubscriptionId"
        />
      </SimpleForm>
    </Edit>
  );
};
