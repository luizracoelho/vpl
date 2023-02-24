using AutoMapper;

using VehiclesService.App.Commands.Brands;
using VehiclesService.App.Commands.Models;
using VehiclesService.App.Commands.Vehicles;
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
                .ForMember(vm => vm.BrandName, opt =>
                {
                    opt.MapFrom(model => model.Brand != null ? model.Brand.Name : "");
                })
                .ForMember(vm => vm.BrandLogo, opt =>
                {
                    opt.MapFrom(model => model.Brand != null ? model.Brand.Logo : "");
                });

            CreateMap<ModelVm, Model>()
                .ForMember(model => model.Brand, opt =>
                {
                    opt.MapFrom(vm => new Brand(vm.BrandName, vm.BrandLogo));
                });

            CreateMap<CreateModelVm, CreateModelCommand>();
            CreateMap<CreateModelVm, UpdateModelCommand>();
            #endregion

            #region Vehicle
            CreateMap<Vehicle, VehicleVm>()
                .ForMember(vm => vm.BrandName, opt =>
                {
                    opt.MapFrom(vehicle => vehicle.Brand != null ? vehicle.Brand.Name : "");
                })
                .ForMember(vm => vm.BrandLogo, opt =>
                {
                    opt.MapFrom(model => model.Brand != null ? model.Brand.Logo : "");
                })
                .ForMember(vm => vm.Model, opt =>
                {
                    opt.MapFrom(vehicle => vehicle.Model != null ? vehicle.Model.Name : "");
                });

            CreateMap<VehicleVm, Vehicle>()
                .ForMember(vm => vm.Brand, opt =>
                {
                    opt.MapFrom(vm => new Brand(vm.BrandName, vm.BrandLogo));
                })
                .ForMember(vm => vm.Model, opt =>
                {
                    opt.MapFrom(vm => new Model(0, vm.Model, "", VehicleType.Car, default, null, false));
                });

            CreateMap<CreateVehicleVm, CreateVehicleCommand>();
            CreateMap<CreateVehicleVm, UpdateVehicleCommand>();
            #endregion
        }
    }
}
