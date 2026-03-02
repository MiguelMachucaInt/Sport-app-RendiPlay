import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/state/auth";

import ManagerTeams from "../../../components/home/Manager/index";
import TeamsAccessService, { TeamsScope } from "@/services/manager";
import type { ManagerTeam } from "@/models/manager";

function scopeFromRoles(roles: string[] | undefined): TeamsScope {
  return roles?.includes("Owner") ? "owner" : "manager";
}

export default function ManagerTeamsScreen() {
  const { user } = useAuthStore();

  const scope = useMemo(() => scopeFromRoles(user?.roles), [user?.roles]);

  const [teams, setTeams] = useState<ManagerTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await TeamsAccessService.getTeams(scope);
        if (mounted) setTeams(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [scope]);

  if (loading) return null;

  return <ManagerTeams data={teams} scope={scope} />;
}
