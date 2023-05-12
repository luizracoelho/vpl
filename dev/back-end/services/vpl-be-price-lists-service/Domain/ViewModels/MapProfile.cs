using AutoMapper;

using PriceListsService.App.Commands.Evaluations;
using PriceListsService.App.Commands.ReferenceYears;
using PriceListsService.Domain.IntegrationsModels;
using PriceListsService.Domain.Models;
using PriceListsService.Domain.ViewModels.Evaluations;
using PriceListsService.Domain.ViewModels.ReferenceYears;

using VehiclesService.Domain.Enums;


namespace PriceListsService.Domain.ViewModels
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            #region Evaluation
            CreateMap<Evaluation, EvaluationVm>().ReverseMap();

            CreateMap<Evaluation, EvaluationVm>()
                .ForMember(vm => vm.ReferenceYearName, opt =>
                {
                    opt.MapFrom(vehicle => vehicle.ReferenceYear != null ? vehicle.ReferenceYear.Year : 0);
                });

            CreateMap<Evaluation, EvaluationVm>()
              .ForMember(vm => vm.ReferecenYearPriceReference, opt =>
              {
                  opt.MapFrom(vehicle => vehicle.ReferenceYear.PriceReference != null ? vehicle.ReferenceYear.PriceReference : 0);
              });


            CreateMap<CreateEvaluationVm, CreateEvaluationCommand>();
            CreateMap<CreateEvaluationVm, UpdateEvaluationCommand>();
            #endregion

            #region ReferenceYear
            CreateMap<ReferenceYear, ReferenceYearVm>().ReverseMap();
            CreateMap<CreateReferenceYearVm, CreateReferenceYearCommand>();
            CreateMap<CreateReferenceYearVm, UpdateReferenceYearCommand>();
            #endregion

            //#region Vehicle
            //CreateMap<Vehicle, VehicleVm>()
            //    .ForMember(vm => vm.Name, opt =>
            //    {
            //        opt.MapFrom(vehicle => vehicle.Name != null ? vehicle.Name : "");
            //    });
            //#endregion

        }
    }
}
