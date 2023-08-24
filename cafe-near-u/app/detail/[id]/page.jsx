"use client";
import storeDetail from "../../components/detail/storeDetail";
import Header from "../../components/header";
import Gallery from "../../components/detail/Gallery";
import BasicInfo from "../../components/detail/BasicInfo";
import StatusInfo from "../../components/detail/StatusInfo";
import Head from "../../components/detail/Head";
import Rules from "../../components/detail/Rules";
import Menu from "../../components/detail/Menu";
import Equipments from "../../components/detail/Equipments";
import RatingAndComments from "../../components/detail/RatingAndComments";
import useStorecommentInfo from "../../ApiHook/useFetchInfoComment";
import useStoreBasicInfo from "../../lib/store_manage/useStoreBasicInfo";

export default function StoreDetail({ params }) {
    const { basiccommentInfo, isLoading, isError, mutate } =
        useStorecommentInfo();

    console.log(basiccommentInfo);

    const { basicInfo } = useStoreBasicInfo(params.id);

    return (
        basicInfo && (
            <div>
                <Header />
                <div className="container mx-2 md:mx-auto py-8 mt-16">
                    <div className="text-base text-gray-800">
                        {basicInfo.data.shop.introduction}
                    </div>
                    <div className="grid grid-cols-12 mt-4 gap-2">
                        <div className="col-span-12 lg:col-span-8">
                            <Gallery
                                primary={basicInfo.data.shop.primary_image}
                                secondary={[
                                    basicInfo.data.shop.secondary_image_1,
                                    basicInfo.data.shop.secondary_image_2,
                                ]}
                            />
                            <Head {...basicInfo.data.shop} />
                            <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
                            <Rules {...basicInfo.data.shop} />
                            <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
                            <Menu {...basicInfo.data.shop} />
                            <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
                            <Equipments {...basicInfo.data.shop} />
                            <div className="h-[0.5px] bg-gray-600 my-6 mr-6"></div>
                            {basiccommentInfo && (
                                <RatingAndComments {...basiccommentInfo.data} />
                            )}
                        </div>
                        <div className="col-span-12 lg:col-span-4 flex flex-col mt-4 lg:mt-0">
                            <BasicInfo {...basicInfo.data.shop} />
                            <StatusInfo id={params.id} />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
