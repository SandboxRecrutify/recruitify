export interface CreateProject {
  staff: {
    managers: Staff[]
    recruiters: Staff[]
  }
  primarySkills: PrimarySkill[]
}

type PrimarySkill = {
  label: string
  value: string
}

type Staff = {
  id: string,
  group: string,
  name: string
}
