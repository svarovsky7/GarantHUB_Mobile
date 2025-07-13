export interface Profile {
  id: string;
  name: string | null;
  email: string;
  role: string;
  created_at: string | null;
}

export interface Claim {
  id: number;
  project_id: number | null;
  claim_status_id: number | null;
  claim_no: string;
  claimed_on: string | null;
  accepted_on: string | null;
  registered_on: string | null;
  resolved_on: string | null;
  engineer_id: string | null;
  description: string | null;
  created_by: string | null;
  created_at: string | null;
  updated_by: string | null;
  updated_at: string | null;
  case_uid_id: number | null;
  pre_trial_claim: boolean;
  owner: string | null;
}

export interface ClaimSummary {
  id: number | null;
  project_id: number | null;
  claim_status_id: number | null;
  claim_no: string | null;
  claimed_on: string | null;
  accepted_on: string | null;
  registered_on: string | null;
  resolved_on: string | null;
  engineer_id: string | null;
  description: string | null;
  created_at: string | null;
  created_by: string | null;
  updated_at: string | null;
  updated_by: string | null;
  case_uid_id: number | null;
  pre_trial_claim: boolean | null;
  owner: string | null;
  project_name: string | null;
  status_name: string | null;
  status_color: string | null;
  engineer_name: string | null;
  engineer_email: string | null;
  created_by_name: string | null;
  case_uid: string | null;
  attachments_count: number | null;
  units_count: number | null;
  defects_count: number | null;
  has_children: boolean | null;
  has_parent: boolean | null;
}

export interface Defect {
  id: number;
  description: string;
  created_at: string | null;
  type_id: number | null;
  status_id: number | null;
  received_at: string | null;
  fixed_at: string | null;
  brigade_id: number | null;
  contractor_id: number | null;
  fixed_by: string | null;
  is_warranty: boolean;
  project_id: number;
  unit_id: number | null;
  created_by: string | null;
  updated_by: string | null;
  updated_at: string | null;
  engineer_id: string | null;
}

export interface DefectSummary {
  id: number | null;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
  type_id: number | null;
  status_id: number | null;
  received_at: string | null;
  fixed_at: string | null;
  brigade_id: number | null;
  contractor_id: number | null;
  fixed_by: string | null;
  is_warranty: boolean | null;
  project_id: number | null;
  unit_id: number | null;
  created_by: string | null;
  updated_by: string | null;
  engineer_id: string | null;
  project_name: string | null;
  unit_name: string | null;
  unit_building: string | null;
  unit_floor: number | null;
  type_name: string | null;
  status_name: string | null;
  status_color: string | null;
  brigade_name: string | null;
  contractor_name: string | null;
  engineer_name: string | null;
  fixed_by_name: string | null;
  attachments_count: number | null;
}

export interface Project {
  id: number;
  name: string;
}

export interface Status {
  id: number;
  entity: string;
  name: string;
  color: string | null;
}