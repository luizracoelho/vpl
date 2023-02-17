using AutoMapper;
using VehiclesService.App.Commands.Brands;
using VehiclesService.App.Commands.Models;
using VehiclesService.Domain.Enums;
using VehiclesService.Domain.Models;
using VehiclesService.Domain.ViewModels.Brands;
using VehiclesService.Domain.ViewModels.Models;
using VehiclesService.Domain.ViewModels.Vehicles;

namespace VehiclesService.Domain.ViewModels
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            #region Brand
            CreateMap<Brand, BrandVm>().ReverseMap();
            CreateMap<CreateBrandVm, CreateBrandCommand>();
            CreateMap<CreateBrandVm, UpdateBrandCommand>();
            #endregion

            #region Model
            CreateMap<Model, ModelVm>()
                .ForMember(vm => vm.Brand, opt =>
                {
                    opt.MapFrom(model => model.Brand != null ? model.Brand.Name : "");
                });

            CreateMap<ModelVm, Model>()
                .ForMember(model => model.Brand, opt =>
                {
                    opt.MapFrom(vm => new Brand(vm.Brand, null));
                });
            CreateMap<CreateModelVm, CreateModelCommand>();
            CreateMap<CreateModelVm, UpdateModelCommand>();
            #endregion

            #region Vehicle
            CreateMap<Vehicle, VehicleVm>()
                .ForMember(vm => vm.Brand, opt =>
                {
                    opt.MapFrom(vehicle => vehicle.Brand != null ? vehicle.Brand.Name : "");
                })
                .ForMember(vm => vm.Model, opt =>
                {
                    opt.MapFrom(vehicle => vehicle.Model != null ? vehicle.Model.Name : "");
                });

            CreateMap<VehicleVm, Vehicle>()
                .ForMember(vm => vm.Brand, opt =>
                {
                    opt.MapFrom(vm => new Brand(vm.Brand, null));
                })
                .ForMember(vm => vm.Model, opt =>
                {
                    opt.MapFrom(vm => new Model(0, vm.Model, "", VehicleType.Car, default, null, false));
                });
            #endregion
        }
    }
}
