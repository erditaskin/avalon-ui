import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

export interface IBreadCrumb {
  path: string;
  label: string;
}

interface IProps {
  breadcrumbs?: IBreadCrumb[];
}

const PageHeaderBreadCrumbs = ({ breadcrumbs }: IProps) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <StyledBreadcrumb
        component="a"
        href="/"
        label="Home"
        icon={<HomeIcon fontSize="small" />}
      />
      {breadcrumbs &&
        breadcrumbs.length > 0 &&
        breadcrumbs.map((bc: IBreadCrumb, index) => {
          return (
            <StyledBreadcrumb
              key={index}
              component="a"
              href={bc.path}
              label={bc.label}
            />
          );
        })}
    </Breadcrumbs>
  );
};

export default PageHeaderBreadCrumbs;
