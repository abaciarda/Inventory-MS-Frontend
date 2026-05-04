import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
  
  import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
  
  import { Badge } from "@/components/ui/badge";
  
  const movements = [
    {
      id: 1,
      product: "Wireless Mouse",
      sku: "PRD-001",
      type: "In",
      quantity: 25,
      user: "Arda Abacı",
      date: "Today, 14:20",
    },
    {
      id: 2,
      product: "Mechanical Keyboard",
      sku: "PRD-002",
      type: "Out",
      quantity: 8,
      user: "Bora Çatalbaş",
      date: "Today, 12:45",
    },
    {
      id: 3,
      product: "USB-C Cable",
      sku: "PRD-003",
      type: "In",
      quantity: 50,
      user: "Şevval Esma Çoban",
      date: "Yesterday, 17:10",
    },
    {
      id: 4,
      product: "HDMI Cable",
      sku: "PRD-004",
      type: "Out",
      quantity: 10,
      user: "Arda Abacı",
      date: "Yesterday, 17:10",
    },
    {
      id: 5,
      product: "VGA Cable",
      sku: "PRD-005",
      type: "In",
      quantity: 20,
      user: "Bilal Ay",
      date: "Yesterday, 17:10",
    },
    {
      id: 6,
      product: "USB-A Cable",
      sku: "PRD-006",
      type: "Out",
      quantity: 15,
      user: "Tuba Süeda Aytan",
      date: "Yesterday, 17:10",
    },
  ];
  
  export function RecentStockMovements() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Stock Movements</CardTitle>
          <CardDescription>
            Recent stock movements in the inventory.
          </CardDescription>
        </CardHeader>
  
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
  
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell className="font-medium">
                    {movement.product}
                  </TableCell>
  
                  <TableCell className="text-muted-foreground">
                    {movement.sku}
                  </TableCell>
  
                  <TableCell>
                    <Badge
                      className="w-10"
                      variant={
                        movement.type === "In" ? "default" : "secondary"
                      }
                    >
                      {movement.type}
                    </Badge>
                  </TableCell>
  
                  <TableCell className="text-right">
                    {movement.type === "In" ? "+" : "-"}
                    {movement.quantity}
                  </TableCell>
  
                  <TableCell className="text-muted-foreground">
                    {movement.user}
                  </TableCell>
  
                  <TableCell className="text-right text-muted-foreground">
                    {movement.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }