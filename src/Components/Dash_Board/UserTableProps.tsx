import { IUser } from "@/types/Users";

export interface UserTableProps {
  users: IUser[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  usersPerPage: number;
  handleRoleChange: (userId: string, newRole: string) => Promise<void>;
  setSelectedUser: (user: IUser | null) => void;
  setEditModalOpen: (open: boolean) => void;
  setDeleteModalOpen: (open: boolean) => void;
}

export interface TableHeader {
  text: string;
  icon: React.ReactNode;
  key: string;
}

export interface RoleOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDarkMode?: boolean;
  isMobile?: boolean;
}
