import React from "react";
import "./AdminSettings.scss";
import "../../components/settings/Settings";

function AdminSettings() {
  return (
    <main id="admin-settings">
      <Settings type="worker" />
    </main>
  );
}

export default AdminSettings;
