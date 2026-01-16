import { useEffect, useState } from "react";
import ManagerTeams from "../../../components/home/Manager/index"
import ManagerService from "@/services/manager";
import type { ManagerTeam } from "@/models/manager";

export default function ManagerTeamsScreen() {
  const [teams, setTeams] = useState<ManagerTeam[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const data = await ManagerService.getMyTeams(); 
        console.log(data)
        setTeams(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null; 

  return <ManagerTeams data={teams} />;
}
