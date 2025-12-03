import Login from "../components/login/login";
import DashboardMain from "../components/dashboard_main/dashboard_main";
import TramitesNotariales from "../components/tramites_notariales/tramites_notariales";
import Bank from "../components/bank/bank";
import GirosComerciales from "../components/giroscomerciales/girsocomerciales";
import BancaSegundoPiso from "../components/banca_segundopiso/banca_segundopiso";
import Dominios from "../components/dominios/dominios";
import BancaPrimerPiso from "../components/banca_primerpiso/banca_primerpiso";
import ErrorService from "../components/errorservice/errorservice";
import Error404 from "../components/error404/error404";
import PanelControl from "../components/paneldecontrol/paneldecontrol";
import Notificaciones from "../components/notificacionesdata/notificaciones";
import MisArchivos from "../components/mis_archivos/mis-archivos";
const routes = [
  {
    path: "/login",
    Component: Login,
    title: "Inicio sesión"
  },
  {
    path: "/dashboard",
    Component: DashboardMain,
    title: "Dashboard Principal"
  },
  {
    path: "/tramites_notariales",
    Component: TramitesNotariales,
    title: "Trámites Notariales"
  },
  {
    path: "/bank",
    Component: Bank,
    title: "Bancos"
  },
   {
    path: "/giroscomerciales",
    Component: GirosComerciales,
    title: "Giros Comerciales"
  },
  {
    path: "/banca_primerpiso",
    Component: BancaPrimerPiso,
    title: "Banca Primer Piso"
  },
  {
    path: "/banca_segundopiso",
    Component: BancaSegundoPiso,
    title: "Banca Segundo Piso"
  },
  {
    path: "/dominios",
    Component: Dominios,
    title: "Dominios"
  },
  {
    path: "/errrorservice",
    Component: ErrorService,
    title: "ErrorServices"
  },
  {
    path: "/error404",
    Component: Error404,
    title: "Error404"
  },
  {
    path: "/paneldecontrol",
    Component: PanelControl,
    title: "PaneldeControl"
  },
  {
    path: "/notificaciones",
    Component: Notificaciones,
    title: "Notificaciones"
  },
  {
    path: "/mis-archivos",
    Component: MisArchivos,
    title: "Mis Archivos"
  },
];

export default routes;