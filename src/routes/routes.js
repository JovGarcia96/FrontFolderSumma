import Login from "../components/login/login";
import DashboardMain from "../components/dashboard_main/dashboard_main";
import TramitesNotariales from "../components/tramites_notariales/tramites_notariales";
import Bank from "../components/bank/bank";
import GirosComerciales from "../components/giroscomerciales/girsocomerciales";
import BancaSegundoPiso from "../components/banca_segundopiso/banca_segundopiso";
import Dominios from "../components/dominios/dominios";
import ControlPermisos from "../components/control_permisos/control_permisos";
import BancaPrimerPiso from "../components/banca_primerpiso/banca_primerpiso";
import ErrorService from "../components/errorservice/errorservice";
import Error404 from "../components/error404/error404";
import PanelControl from "../components/paneldecontrol/paneldecontrol";
import { Component } from "lucide-react";

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
    path: "/control-permisos",
    Component: ControlPermisos,
    title: "Control de Permisos"
  },
  {
    path: "/errrorservice",
    Component:ErrorService ,
    title: "ErrorServices"
  },

  {
    path: "/error404",
    Component:Error404,
    title: "Error404"
  },
  {
    path: "/panelcontrol",
    Component: PanelControl,
    title:"PaneldeControl"
    
  }

];

export default routes;