import { DashHeading } from "../../../components/dashboard-components/DashHeading";
import {
  Button,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
    Album,
  BellRing,
  Book,
  ChartLine,
  Download,
  Edit,
  Eye,
  ListFilterIcon,
  Mail,
  MessageSquare,
  Pi,
  PlusIcon,
  Trash2,
  UsersRound,
} from "lucide-react";
import OverviewCards from "../../../components/dashboard-components/OverviewCards";
import AnalyticsCards from "../../../components/dashboard-components/AnalyticsCards";
import ApexChart from "../../../components/dashboard-components/AnalyticsChat";
import BarChart from "../../../components/dashboard-components/BarChart";
import PieChart from "../../../components/dashboard-components/PieChart";

const Analytics = () => {
  const statuses = [
    { key: "all", label: "All Status" },
    { key: "draft", label: "Draft" },
    { key: "published", label: "Published" },
  ];
  const filters = [{ key: "all", label: "Filter" }];
  const Datefilters = [
    { key: "Today, 4 Dec 2025", label: "Today, 4 Dec 2025" },
    { key: "Yesterday,  3 Dec2025", label: "Yesterday, 3 Dec 2025" },
    { key: "Tommorrow, 5 Dec 2025", label: "Tommorrow, 5 Dec 2025" },
  ];
   const cardsData = [
    {
      title: "Total Enrollments",
      value: "12,847",
      icon: <Album size={26} color="#06574C"/>,
      changeText: "+12.5% from last month",
      changeColor: "text-[#38A100]"
    },
    {
      title: "Revenue",
      value: "$89,432",
      icon: <ChartLine size={26} color="#06574C"/>,
      changeText: "Avg. duration: 28m",
      changeColor: "text-[#38A100]"
    },
    {
      title: "Active Users",
      value: "3,847",
      icon: <UsersRound size={26} color="#06574C"/>,
      changeText: "-2.1% from last week",
      changeColor: "text-[#E8505B]"
    },
  ];
  return (
    <div className="bg-white sm:bg-linear-to-t from-[#F1C2AC]/50 to-[#95C4BE]/50 px-2 sm:px-3">
      <DashHeading
        title={"Announcements"}
        desc={"Manage and send announcements to your organization"}
      />
      <div className="bg-[#EBD4C9] flex-wrap gap-2 p-2 sm:p-4 rounded-lg my-3 flex justify-between items-center">
        <div className="flex  items-center gap-2">
          <Select
            isRequired
            className="md:min-w-[120px]"
            radius="sm"
            defaultSelectedKeys={["all"]}
            placeholder="Select an status"
          >
            {statuses.map((status) => (
              <SelectItem key={status.key}>{status.label}</SelectItem>
            ))}
          </Select>
          <Select
            isRequired
            radius="sm"
            className="md:min-w-[120px]"
            defaultSelectedKeys={["all"]}
            selectorIcon={<ListFilterIcon />}
            placeholder="Select an animal"
          >
            {filters.map((filter) => (
              <SelectItem key={filter.key}>{filter.label}</SelectItem>
            ))}
          </Select>
        </div>
        <Button
          startContent={<Download size={20} />}
          radius="sm"
          className="bg-[#06574C] text-white"
        >
          Export
        </Button>
      </div>
      <AnalyticsCards data={cardsData} />
      <div className="grid grid-cols-12 gap-3 my-3">
          <div className="col-span-6 bg-white p-3 rounded-lg">
            <ApexChart />
          </div>
          <div className="col-span-6 bg-white p-3 rounded-lg">
            <BarChart />
          </div>
          <div className="col-span-6 bg-white px-3 py-5 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Course Performance Analytics</h1>
              <Select
                radius="sm"
                className="w-50"
                defaultSelectedKeys={["all"]}
                placeholder="Select an animal"
              >
                {Datefilters.map((filter) => (
                  <SelectItem key={filter.key}>{filter.label}</SelectItem>
                ))}
              </Select> 
            </div>
          </div>
          <div className="col-span-6 bg-white p-3 rounded-lg">
            <PieChart />
          </div>
      </div>
    </div>
  );
};

export default Analytics;
