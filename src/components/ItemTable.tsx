import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

type InputFieldProps = {};

export const ItemTable: React.FC<InputFieldProps> = () => {
  const [itemList, setItemsList] = useState<any[]>([]);
  const { currentUser, logout } = useAuth()

  const deleteItem = (id: string) => {
    const itemsRef = firebase.database().ref("Todo/" + currentUser?.uid).child(id);
    itemsRef.remove();
  };

  useEffect(() => {
    const itemsRef = firebase.database().ref("Todo/" + currentUser?.uid);
    itemsRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const itemList = [];
      for (let id in items) {
        itemList.push({ id, ...items[id] });
      }
      setItemsList(itemList);
    });
  }, []);

  return (
    <Table variant="simple" mt={20}>
      <TableCaption>End of items.</TableCaption>
      <Thead>
        <Tr>
          <Th>Item</Th>
          <Th isNumeric>Quantity</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {itemList ? (
          itemList?.map((item: any) => (
            <Tr>
              <Td>{item.name}</Td>
              <Td isNumeric>{item.quantity}</Td>
              <Td>
                {/* <Center> */}
                {/* <Box> */}
                <Button
                  onClick={() => { deleteItem(item.id); }}
                >
                  <DeleteIcon />
                </Button>
                {/* <Button>
                  <EditIcon />
                </Button> */}
                {/* </Box> */}
                {/* </Center> */}
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td>
              <Skeleton height="20px" />
            </Td>
            <Td>
              <Skeleton height="20px" />
            </Td>
            <Td ml={10}>
              <Skeleton height="20px" />
            </Td>
          </Tr>
        )}
      </Tbody>

      {/* <Tfoot>
    <Tr>
      <Th>To convert</Th>
      <Th>into</Th>
      <Th isNumeric>multiply by</Th>
    </Tr>
  </Tfoot> */}
    </Table>
  );
};
